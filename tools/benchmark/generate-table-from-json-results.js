const util = require("util")
const path = require("path")
const exec = util.promisify(require("child_process").exec)
const fs = require("fs/promises")

function groupBy(array, keyGetter) {
  const map = []
  array.forEach((item) => {
    const key = keyGetter(item)
    if (!map[key]) map[key] = [item]
    else map[key].push(item)
  })
  return map
}

async function aggregateBenchResultsByTag(tag) {
  const cmd = await exec(`cat ${tag} | jq -s '[.[]]'`, {
    cwd: path.join(__dirname, "../../", "bench-output"),
  })
  return JSON.parse(cmd.stdout)
}

async function main() {
  const res = await aggregateBenchResultsByTag("*-100rps.json")
  const groupedByQuery = groupBy(res.flat(), (it) => it.name.split("_").pop())

  const results = {}
  const queryRegex = /(?<query>.+)-.+-\d+rps/

  for (const [benchName, queryResults] of Object.entries(groupedByQuery)) {
    results[benchName] = []

    for (const benchmark of queryResults) {
      const queryRegexMatch = benchmark.name.match(queryRegex)
      const [x, ...ys] = queryRegexMatch?.groups?.query.split("_")
      results[benchName].push({
        platform: x,
        queryName: ys.join("_"),
        benchmarkName: benchmark.name,
        requestAvg: benchmark.requests.average,
        p90: benchmark.histogram.json.p90,
      })
    }
  }

  await fs.writeFile(
    "results-unconstrained.json",
    JSON.stringify(results, null, 2),
    "utf-8"
  )
  console.log(results)
}

main().catch(console.log)
