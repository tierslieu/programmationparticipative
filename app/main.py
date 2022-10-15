from fastapi import  FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, Response
import httpx
import asyncio
# Use this to serve a public/index.html
from starlette.responses import RedirectResponse  

######################################
app = FastAPI()
app.mount("/public", StaticFiles(directory="/app/public"), name="public")

######################################
@app.get("/")
async def read_index():
    return RedirectResponse(url="/public/index.html?v=34")   

###################
## authentification
###################
async def oceco_auth(user, passwd):
    async with httpx.AsyncClient() as client:
        url = 'https://oce.co.tools/api/generatetokenrest'
        data = {'email': user, 'pwd': passwd}
        headers = {'Content-Type' : 'application/json'}
        try:
            res = await client.post(url, json=data, headers=headers) 
            res.raise_for_status()
        except httpx.RequestError as exc:
            print(f"An error occurred while requesting {exc.request.url!r}.")
        except httpx.HTTPStatusError as exc:
            print(f"Error response {exc.response.status_code} while requesting {exc.request.url!r}.")
        return res

###################
## batch
###################
async def oceco_batch(id, token, data):
    async with httpx.AsyncClient() as client:
        url = 'https://oce.co.tools/api/batchjson/create'
        headers = {'x-user-id' : id, 'x-access-token' : token, 'Content-Type' : 'application/json'}
        
        res = await client.post(url, json=data, headers=headers, timeout=30) 
        return res

######################################
## ROUTE pour auth+batch oceco
######################################
@app.post("/oceco/")
async def api_data(info: Request):
    req_info = await info.json()
    user = req_info['user']
    passwd = req_info['passwd']
    data = req_info['data']
    #print(req_info)

    ## Authentification
    resp_auth = await oceco_auth(user, passwd)
    resp_auth_json = resp_auth.json()
    print(resp_auth_json)
    _id = resp_auth_json['_id']
    token = resp_auth_json['token']

    ## Creation avec batch json
    resp_batch = await oceco_batch(_id, token, data)
    resp_batch_json = resp_batch.json()
    print(resp_batch_json)
    return resp_batch_json