HASURA_URL = http://localhost:8080

# Set this to --http-debug or --http-debug="full" if you want debug output
K6_COMMON_FLAGS = --discard-response-bodies
K6_DEBUG_MODE = 

BENCHMARK_SCRIPT = k6-benchmark-script.js

# IE "make run_bench TARGET=APOLLO" or "TARGET=HASURA"
run_bench:
	docker run -e TARGET=$(TARGET) -i -v $(PWD)/summary.json:/summary.json loadimpact/k6 run - <$(BENCHMARK_SCRIPT)

# make run_max_request_in_duration_bench TARGET=HASURA VUS=10 DURATION=10
run_max_request_in_duration_bench:
	docker run -e TARGET=$(TARGET) -i -v $(PWD):/results \
		loadimpact/k6 run \
			-u $(VUS) \
			-d $(DURATION)s \
			--summary-export /results/$(TARGET)-summary-max-requests-$(VUS)vus-$(DURATION)secs.json \
			$(K6_COMMON_FLAGS) \
			$(K6_DEBUG_MODE) \
			- <$(BENCHMARK_SCRIPT)

# wsl make run_rps_bench TARGET=APOLLO RPS=300 VUS=10 DURATION=10
run_rps_bench:
	docker run -e TARGET=$(TARGET) -i -v $(PWD):/results \
		loadimpact/k6 run \
			--rps $(RPS) \
			-u $(VUS) \
			-d $(DURATION)s \
			--summary-export /results/$(TARGET)-summary-$(RPS)rps-$(VUS)vus-$(DURATION)secs.json \
			$(K6_COMMON_FLAGS) \
			$(K6_DEBUG_MODE) \
			- <$(BENCHMARK_SCRIPT)

# make run_total_iterations_bench TARGET=APOLLO ITERATIONS=10000 VUS=10
run_total_iterations_bench:
	docker run -e TARGET=$(TARGET) -i -v $(PWD):/results \
		loadimpact/k6 run \
			--iterations $(ITERATIONS) \
			-u $(VUS) \
			--summary-export /results/$(TARGET)-summary-$(ITERATIONS)-total-iterations-$(VUS)vus-$(DURATION)secs.json \
			$(K6_COMMON_FLAGS) \
			$(K6_DEBUG_MODE) \
			- <$(BENCHMARK_SCRIPT)	