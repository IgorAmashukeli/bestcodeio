const Docker = require('dockerode');
const fs = require('fs');


const docker = new Docker();

const volumePath = '/home/igor/Programming/Industry/PetProjects/bestcodeio/Dockercpp';

const containerPath = '/data'


let container = '';



let currentString = '#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\"; \n}';


function checkContainersForImage(imageName, callback) {
    docker.listContainers({ all: true }, function (err, containers) {
        if (err) {
            callback(err, null);
            return;
        }

        const containerWithImage = containers.some(c => c.Image === imageName);
        if (containerWithImage) {
            const existingContainer = containers.find(c => c.Image === imageName);
            container = docker.getContainer(existingContainer.Id);
        }
        callback(null, container);
    });
}




function executeCppCommand() {

    container.exec({
        Cmd: ['sh', '-c', 'g++ /data/first.cpp && ./a.out'],
        AttachStdout: true,
        AttachStderr: true
    }, function (err, exec) {
        if (err) {
            console.error('Error executing cpp command:', err);
            return;
        }


        exec.start(function (err, stream) {
            if (err) {
                console.error('Error starting cpp command:', err);
                return;
            }

            let cppOutput = '';


            stream.on('data', function (chunk) {
                cppOutput += chunk.toString();
            });


            stream.on('end', function () {

                console.log(cppOutput);
            });
        });
    });
}




function runContainer() {
    fs.writeFileSync(`${volumePath}/first.cpp`, currentString);

    checkContainersForImage('gcc', function (err, containerExists) {
        if (err) {
            console.error('Error checking containers for image:', err);
            return;
        }

        if (!containerExists) {
            docker.createContainer({
                Image: 'gcc',
                Tty: true,
                AttachStdout: true,
                AttachStderr: true,
                HostConfig: {
                    Binds: [`${volumePath}:${containerPath}`],
                },
            }, function (err, newContainer) {
                if (err) {
                    console.error('Error creating container:', err);
                    return;
                }

                container = newContainer;

                container.start(function (err, data) {
                    if (err) {
                        console.error('Error starting container:', err);
                        return;
                    }

                    executeCppCommand();
                });
            });
        } else {


            container.restart(function (err, data) {
                if (err) {
                    console.error('Error restarting container:', err);
                    return;
                }

                executeCppCommand();
            });
        }
    });

}


runContainer();