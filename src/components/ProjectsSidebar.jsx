import Button from "./Button"
export default function ProjectsSidebar({onAddNewProject, projectsData, onSelectedProject, selectedProjectId}) {

    function addProjectHandler() {
        onAddNewProject();
    }

    function showSelectedProject(projData) {
        onSelectedProject(projData);
    }

    return <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
            <Button addProject={addProjectHandler}>+ Add Project</Button>
        </div>
        <ul className="mt-8">
            {projectsData.map(proj => {
                return <li className={`${selectedProjectId === proj.id ? 'text-stone-200 bg-stone-800' : ''}`} key={proj.id} onClick={() => showSelectedProject(proj)}><button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800">{proj.title}</button></li>
            })}
        </ul>
    </aside>
}