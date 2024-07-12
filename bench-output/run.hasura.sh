docker run --net=host -v "$PWD":/app/tmp -it \
  graphql-bench query \
  --config="./tmp/config.hasura.yaml" \
  --outfile="./tmp/report.hasura.json"