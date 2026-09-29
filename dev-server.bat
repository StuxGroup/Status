@echo off
setlocal
REM Status - Local dev server (Windows)
REM Usage: dev-server.bat [--no-dev-mode] [port]
REM   port            default: 8000
REM   --no-dev-mode   render the status page exactly as production would
REM
REM Generates 90 days of example data for the monitors in .githup.yml, builds
REM the GitHup status page into .dev\public, copies site\ (the /legal pages and
REM 404) on top and serves it all with python -m http.server, just like
REM https://status.stux.group.
REM
REM GitHup itself is found at %GITHUP_PATH%, else ..\GitHup (a sibling checkout),
REM else it is cloned into .dev\GitHup.
REM DEV_MODE is on by default: the status page shows GitHup's DEV MODE banner and
REM the /legal pages show their own on localhost (?nodev=1 hides theirs).

set "DIR=%~dp0"
set "PORT=8000"
set "DEV_MODE=1"

:args
if "%~1"=="" goto run
if /i "%~1"=="--no-dev-mode" (
    set "DEV_MODE=0"
) else (
    set "PORT=%~1"
)
shift
goto args

:run
cd /d "%DIR%"
set "GITHUP=%GITHUP_PATH%"
if not "%GITHUP%"=="" goto found
if exist "%DIR%..\GitHup\githup\__init__.py" (
    set "GITHUP=%DIR%..\GitHup"
    goto found
)
set "GITHUP=%DIR%.dev\GitHup"
if not exist "%GITHUP%" git clone --depth 1 https://github.com/StuxGroup/GitHup.git "%GITHUP%" || exit /b 1

:found
set "PYTHONPATH=%GITHUP%"
set "PYTHONDONTWRITEBYTECODE=1"

REM GitHup empties its output folder, so the status page is built first.
python -m githup demo --config .githup.yml --data-dir .dev/data || exit /b 1
python -m githup site --config .githup.yml --data-dir .dev/data --incidents-file .dev/data/incidents.json --out .dev/public --no-deploy || exit /b 1
xcopy site .dev\public\ /e /i /q /y >nul || exit /b 1

if "%DEV_MODE%"=="1" (
    echo Stux.Group Status ^(DEV_MODE=1^) at http://127.0.0.1:%PORT%/
) else (
    echo Stux.Group Status ^(production rendering^) at http://127.0.0.1:%PORT%/  ^(add ?nodev=1 on /legal pages^)
)
python -m http.server %PORT% --bind 127.0.0.1 --directory .dev/public
