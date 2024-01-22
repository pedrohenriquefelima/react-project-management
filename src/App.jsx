import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({selectedProjectId: undefined, projects: [], tasks: []});
  const [selectedProject, setSelectedProject] = useState('');

  function handleAddTask(task) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, task]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(item => item.id !== id)
      }
    })
  }

  function showNewProjectHandler() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function addProjectHandler(data) {
    setProjectState(prevState => {
      return {
        ...prevState,
        projects: [...prevState.projects, data],
        selectedProjectId: undefined
      }
    })
  }

  function cancelProjectHandler() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function selectedProjectViewHandler(project) {
    console.log('here',JSON.stringify(project));
    setSelectedProject(projectState.projects.find(item => item.id === project.id));

    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: project.id
      }
    });
  }

  function deleteHandler(proj) {
    console.log(JSON.stringify(proj));
    setProjectState(prevState => {
      return {
        projects: prevState.projects.filter(item => item.id !== proj.id),
        selectedProjectId: undefined
      }
    })
  }

  let content;

  if(projectState.selectedProjectId === null) {
    content = <NewProject onAddProjectUp={addProjectHandler} onCancelProjectUp={cancelProjectHandler}/>
  } else if (projectState.selectedProjectId === undefined) {
    //if it is null it means that someone hasn't clicked on a project
    //if it is undefined it means that someone hasn't clicked on a project AND hasn't haven't clicked on the 'New project' button
    content = <NoProjectSelected onAddNewProject={showNewProjectHandler}/>
  } else if(projectState.selectedProjectId !== undefined) {
    content = <SelectedProject project={selectedProject} onDeleteMoveUp={deleteHandler} addNewTaskParent={handleAddTask} deleteTask={handleDeleteTask} tasksData={projectState.tasks}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onSelectedProject={selectedProjectViewHandler} onAddNewProject={showNewProjectHandler} projectsData={projectState.projects} selectedProjectId={projectState.selectedProjectId}/>
        {content}
    </main>
  );
}

export default App;
