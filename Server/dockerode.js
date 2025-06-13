var Docker = require('dockerode');
 

//connect to docker
const docker = new Docker();

const portBindings = {
    '80/tcp': [{ HostPort: '8080' }]
};

//create a container and start
/*
const createContainer = async () => {
    const container = await docker.createContainer({
        Image: 'wordpress',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        ExposedPorts: { '80/tcp': {} },
        HostConfig: {
          PortBindings: portBindings
        },
        name: 'wordpress-container4'
      });

      await container.start();
}

createContainer();

//get a list of all containers id

docker.listContainers({all: true}, function (err, containers) {
  containers.forEach(function (containerInfo) {
    console.log(docker.getContainer(containerInfo.Id));
  });
});

//get container from id

var container1 = docker.getContainer('ce04b105ea0d277908e56ba7ecef099877a4f9882db19f1c66a03cbe1384b0c8');

container1.inspect(function (err, data) {
  console.log(data);
});



//remove container

container1.remove(function (err, data) {
  console.log(data);
});

//stop all continers

docker.listContainers({all: true}, function (err, containers) {
  containers.forEach(function (containerInfo) {
    docker.getContainer(containerInfo.Id).stop();
  });
});


*/




let ids = []
async function get_ids() {
  const containers = await docker.listContainers({ all: true });
  ids = []
  containers.forEach(function (containerInfo) {
    ids.push(containerInfo.Id);
  });
  return ids;
}

var x = new Array();
async function get_id(pos){

  const containers = await docker.listContainers({all: true})
    x = []
  containers.forEach(function (containerInfo) {
      x.push(containerInfo.Id);
    });
    return x[pos];
}

function remove(pos){
  const z = new Array();

  docker.listContainers({all: true}, function (err, containers) {
  containers.forEach(function (containerInfo) {
      z.push(containerInfo.Id);
    });
    z.reverse()
   
    console.log(z)
     var container1 = docker.getContainer(z[pos]);
      container1.remove(function (err, data) {
      console.log(data);
      console.log(z)
      });
    
  });

}

async function create(name, image) {

 const containers = await docker.listContainers({ all: true });
for (const containerInfo of containers) {
    const container1 = docker.getContainer(containerInfo.Id);
    const x = (await container1.inspect()).Name;
    const Name = '/' + name; 
    if (Name == x) {
        return "Name already taken";  
    }
}
  
  const container = await docker.createContainer({
      Image: image,
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      ExposedPorts: { '80/tcp': {} },
      HostConfig: {
          PortBindings: portBindings
      },
      name: name
  });
  return "created"
    
      
}
function startostop(pos){
  let status = ""
   const z = new Array();

  docker.listContainers({all: true}, function (err, containers) {
  containers.forEach(function (containerInfo) {
      z.push(containerInfo.Id);
    });
    for(let i = 0; i<z.length;i++){
      var container = docker.getContainer(z[i])
      container.inspect(function(err, data){
      console.log(data.State.Running && i !== pos)
      if(data.State.Running && i !== pos){
        return "ended";
      }})
        
    }
     var container1 = docker.getContainer(z[pos]);
      container1.inspect(function (err, data) {
         status = data.State.Status;
         if(data.State.Running){
          container1.stop()
        }
        else{
          container1.start()
        }
    
      });
      
  });
}

async function get_startostop(pos){
  let status = ""
   const z = new Array();

  const containers = await docker.listContainers({all: true}) 
  containers.forEach(function (containerInfo) {
      z.push(containerInfo.Id);
      
    });
     var container1 =  docker.getContainer(z[pos]);
      const data = await container1.inspect()
         if(data.State.Running){ 
          return "Started"
        }
        else{  
          return "Stopped"
        }
}

let output = ""
async function cpu(pos){
  var z = new Array();
  const containers = await docker.listContainers({all: true}) 
  containers.forEach(function (containerInfo) {
      z.push(containerInfo.Id);
    });
    var container = docker.getContainer(z[pos])
    v = await container.inspect()
    output = v.HostConfig.CpuPercent
      return output  
}
let id_list = []
let all_list = []
async function refresh() {
  id_list = []
  all_list = []
  id_list = await get_ids()
  for(let i = 0; i<id_list.length; i++){
     var container1 = docker.getContainer(id_list[i]);
     x = (await container1.inspect()).Name
     x = x.slice(1)
    all_list.push({pos: id_list.length - i - 1, id:id_list[i],name:x, cpu:await cpu(i), is_run:await get_startostop(i)})
  }
  
  return all_list.reverse()
  
}


module.exports = {get_ids, get_id, remove, create, startostop, cpu, get_startostop, refresh};