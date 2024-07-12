docker-compose down 
./wait-for-it.sh --timeout=5
docker-compose  --compatibility up --build -d
./wait-for-it.sh localhost:4000
cd ./bench-output 
./run.apollo.sh
./run.hasura.sh