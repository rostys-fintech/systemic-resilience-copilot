.PHONY: run validate
IMAGE ?= systemic-resilience-copilot
PORT ?= 18765

# Supply LLM_NAME, LLM_BASE_URL, and LLM_API_KEY in the environment.
# Example for on-prem inference: export LLM_BASE_URL=http://host.docker.internal:8000/v1
run:
	docker build -t $(IMAGE) .
	docker run --rm -p $(PORT):18765 --add-host=host.docker.internal:host-gateway -e LLM_NAME -e LLM_BASE_URL -e LLM_API_KEY -e HF_TOKEN -e APERTUS_API_BASE -e APERTUS_MODEL -e APERTUS_MOCK=0 $(IMAGE)

validate:
	npm run validate
