docker run --net=host -v "$PWD":/app/tmp -it \
  graphql-bench query \
  --config="./tmp/config.apollo.auth.yaml" \
  --outfile="./tmp/report.apollo.auth.json"