This is a suite of docker-enabled simple web applications to gain familiarity with how Docker works.  Each folder (with the exception of testfiles) is a standalone application.

The protocol should be this:
- Clone this repo.
- Build the Docker image using the Dockerfile

	ie. "docker build -t <desired-docker-image-name> ."
- Run a container with the options to allow for:
	- mounting the desired application directory
	- Exposing the necessary ports
	- Allowing for stdin tty connections via terminal
	- Running in detached mode

	ie. "docker run -itd -p 8080:3000 -v <path-to-app-folder>:<desired-container-path> 
					--name <desired-name-of-container> <name-of-Docker-image>"
- Enter into the container
	
	ie "docker exec -it <name-of-running-container-to-enter> /bin/bash"

- Enter working directory of app code within container
	
	ie "cd <desired-container-path>"
- Install node-modules once inside container

	ie "npm install"

- Run app

	ie "node index.js" OR "nodemon index.js" OR "npm bin/www" etc.

- View app from your web browser

	- <http://docker-machine IP:8080> OR POTENTIALLY <localhost:8080>
	- get the docker-machine ip via "docker-machine ip" command in shell

- Change code around via your favorite web browser

- Save changes

- either rerun app from docker container or, if you used nodemon, wait for automated restart

- View new changes from web browser.