#!/bin/bash

dotnet tool install dotnet-ef --global
dotnet add package Microsoft.EntityFrameworkCore.Design

# --use-database-names

case "$1" in
    postgres)

        # IE: "Host=localhost;Database=postgres;Port=5432;Username=postgres;Password=postgrespassword"
        dotnet ef dbcontext scaffold "$2" Npgsql.EntityFrameworkCore.PostgreSQL --schema public --output-dir ./Models
        ;;
      
    mssql)
        dotnet ef dbcontext scaffold "$2" Microsoft.EntityFrameworkCore.SqlServer --data-annotations --schema dbo --output-dir ./Models
        ;;
      
    *)
        echo $"Usage: $0 {postgres|mssql} {connection string}"
        exit 1
esac