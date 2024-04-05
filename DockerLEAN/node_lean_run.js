const Docker = require('dockerode');
const fs = require('fs');


const docker = new Docker();

const volumePath = '/home/igor/Programming/Industry/PetProjects/bestcodeio/DockerLEAN';

const containerPath = '/data'

const some_theorem = "theorem test (p q : Prop) (hp : p) (hq : q) : p ∧ q ∧ p"

const some_code = "theorem test (p q : Prop) (hp : p) (hq : q) : p ∧ q ∧ p := by apply And.intro; exact hp; apply And.intro; exact hq; exact hq;";


let container = '';


let currentString = '';



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

        callback(null, containerWithImage);
    });
}


function runContainer() {

    fs.writeFileSync(`${volumePath}/first.lean`, currentString);


    checkContainersForImage('lean_image', function (err, containerExists) {
        if (err) {
            console.error('Error checking containers for image:', err);
            return;
        }

        if (!containerExists) {
            // Create and start a new container
            docker.createContainer({
                Image: 'lean_image',
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

                // Start the container
                container.start(function (err, data) {
                    if (err) {
                        console.error('Error starting container:', err);
                        return;
                    }

                    executeLeanCommand(); // Execute lean command after container start
                });
            });
        } else {


            container.restart(function (err, data) {
                if (err) {
                    console.error('Error restarting container:', err);
                    return;
                }

                executeLeanCommand();
            });
        }
    });
}


function executeLeanCommand() {

    container.exec({
        Cmd: ['lean', '/data/first.lean'],
        AttachStdout: true,
        AttachStderr: true
    }, function (err, exec) {
        if (err) {
            console.error('Error executing lean command:', err);
            return;
        }


        exec.start(function (err, stream) {
            if (err) {
                console.error('Error starting lean command:', err);
                return;
            }

            let leanOutput = '';


            stream.on('data', function (chunk) {
                leanOutput += chunk.toString();
            });


            stream.on('end', function () {

                if (leanOutput.includes('warning') || leanOutput.includes('error')) {
                    console.log('Wrong Proof:', leanOutput.trim());
                } else {
                    if (currentString.includes(some_theorem)) {
                        console.log('OK! All theorems are proved');
                    } else {
                        console.log('Missing Proof: No "' + some_theorem + '" found');
                    }
                }
            });
        });
    });
}


function runContainerWithContent(newString) {
    currentString = newString;
    runContainer();
}


runContainerWithContent(some_code);

