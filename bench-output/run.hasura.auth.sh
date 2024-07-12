docker run --net=host -v "$PWD":/app/tmp -it \
  graphql-bench query \
  --config="./tmp/config.hasura.auth.yaml" \
  --outfile="./tmp/report.hasura.auth.json"