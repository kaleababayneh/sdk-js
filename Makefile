-include e2e.env
export

# Defaults for browser e2e test; should be overridden in e2e.env
E2E_CHROME_EXECUTABLE ?= /usr/bin/google-chrome
E2E_CHROME_PROFILE_DIR ?=
E2E_CHROME_PROFILE_NAME ?=
E2E_SNAPI_BIN ?=
E2E_SNAPI_URL ?= http://localhost:3000
E2E_BROWSER_URL ?= http://localhost:3001
E2E_KEPLR_AUTO_APPROVE ?= 1
E2E_KEPLR_DEBUG ?= 0
E2E_KEPLR_PASSWORD=

.PHONY: e2e-browser
e2e-browser:
	@echo "Running browser e2e with:"
	@echo "  E2E_CHROME_EXECUTABLE  = $(E2E_CHROME_EXECUTABLE)"
	@echo "  E2E_CHROME_PROFILE_DIR = $(E2E_CHROME_PROFILE_DIR)"
	@echo "  E2E_CHROME_PROFILE_NAME= $(E2E_CHROME_PROFILE_NAME)"
	@echo "  E2E_SNAPI_BIN          = $(E2E_SNAPI_BIN)"
	@echo "  E2E_SNAPI_URL          = $(E2E_SNAPI_URL)"
	@echo "  E2E_BROWSER_URL        = $(E2E_BROWSER_URL)"
	@echo "  E2E_KEPLR_AUTO_APPROVE = $(E2E_KEPLR_AUTO_APPROVE)"
	@echo "  E2E_KEPLR_DEBUG        = $(E2E_KEPLR_DEBUG)"
	@if [ -z "$$E2E_KEPLR_PASSWORD" ]; then \
	  echo "ERROR: E2E_KEPLR_PASSWORD is not set. Set it in e2e.env or your shell."; \
	  exit 1; \
	fi
	@E2E_CHROME_EXECUTABLE="$(E2E_CHROME_EXECUTABLE)" \
	  E2E_CHROME_PROFILE_DIR="$(E2E_CHROME_PROFILE_DIR)" \
	  E2E_CHROME_PROFILE_NAME="$(E2E_CHROME_PROFILE_NAME)" \
	  E2E_SNAPI_BIN="$(E2E_SNAPI_BIN)" \
	  E2E_SNAPI_URL="$(E2E_SNAPI_URL)" \
	  E2E_BROWSER_URL="$(E2E_BROWSER_URL)" \
	  E2E_KEPLR_AUTO_APPROVE="$(E2E_KEPLR_AUTO_APPROVE)" \
	  E2E_KEPLR_PASSWORD="$$E2E_KEPLR_PASSWORD" \
	  E2E_KEPLR_DEBUG="$(E2E_KEPLR_DEBUG)" \
	  pnpm run e2e:browser
