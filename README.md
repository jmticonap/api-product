# Product Rest-Api
Simple rest-api for registri of generic products, this is develop with NodeJs, ExpressJs, TypeORM, ApiCache, Express-Validator, for testing is used Jest and Supertest, for the other hand, for the persistance layer is used PostgreSql with Docker, in the same way for deploy proces is implement dockerizing for the rest-api and the compose file for run all the depends services.

## Dockerizing the App
```shell
docker buil . -t docker_user/api-product
```
For run correctly you have to remplace "docker_user" with your user
of docker, after that you can see the list of images with the following 
command.
```sh
docker images
```
![Docker image list](images/docker_image_api.png)
Now we can run.
```sh
docker compose up
```
![Docker compose running](images/docker_compose_running.png)
Finally we are ready to use the app.

## Using end-points
- ### Category:
    ##### /api/category/ [GET]
    Returns a page with 20 results for default but we can use path query "?offset=5&limit=5" to customize the result and get the information paginated.
    ```json
    {
	"count": 10,
	"limit": 5,
	"nextOffset": 5,
	"previousOffset": 0,
	"results": [
    		{
    			"id": 6,
    			"name": "Category #6",
    			"description": "Description empty"
    		},
    		// ...
	    ]
    }
    ```
    ##### /api/category/<ID> [GET]
    Allow to get a single category search by it's ID.
    ```json
    {
		"id": 8,
		"name": "Category #8",
		"description": "Description empty"
	}
    ```
    ##### /api/category/ [POST]
    Allow to send the new category data and take keep in the persistence layer.
    ```json
    {
    	"name": "Cateogry name",
    	"description": "Category description"
    }
    ```
    Then answer is the entity of category as a JSON
    ##### /api/category/<ID> [PUT]
    Allow to send those fields of category that we want to update. [name | description]
    ```json
    {
    	"name": "Cateogry name",
    	"description": "Category description"
    }
    ```
    Answer
    ```json
    {
    	"affected": 1
    }
    ```
    ##### /api/category/<ID>/addproducts [PATCH]
    Allow to add products to the given category by the ID
    ```json
    {
    	"productIds": [1, 2]
    }
    ```
    Answer
    ```json
    {
	    "affected": 2
    }
    ```
- ### Product:
    ##### /api/product/ [GET]
    Returns a page with 20 results for default but we can use path query "?offset=5&limit=5" to customize the result and get the information paginated.
    ```json
    {
    	"count": 120,
    	"limit": 10,
    	"nextOffset": 20,
    	"previousOffset": 0,
    	"results": [
    		{
    			"id": 1,
    			"name": "Product #1",
    			"description": "Description empty #1",
    			"isactive": true,
    			"brand": "jmtp.dev",
    			"stock": 178,
    			"price": 49.42
    		},
    		// ...
    	]
    }
    ```
    ##### /api/property/<ID> [GET]
    Allow to get a single product search by it's ID.
    ```json
    {
    	"id": 8,
    	"name": "Product #8",
    	"description": "Description empty #8",
    	"isactive": true,
    	"brand": "jmtp.dev",
    	"stock": 136,
    	"price": 51.13
    }
    ```
    ##### /api/product/ [POST]
    Allow to send the new product data and take keep in the persistence layer.
    ```json
    {
    	"name": "product 001",
    	"description": "product 001 description",
    	"brand": "jmtp"
    }
    ```
    Then answer is the entity of category as a JSON with the missing field with it's default values
    ##### /api/product/<ID> [PUT]
    Allow to send those fields of product that we want to update. [name | description | brand | stock | isActive | price]
    ```json
    {
    	"name": "Product name",
    	"description": "Product description"
    }
    ```
    Answer
    ```json
    {
    	"affected": 1
    }
    ```
