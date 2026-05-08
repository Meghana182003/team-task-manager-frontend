import { useState, useEffect } from "react";

import API from "../api/api";

function Dashboard() {

  const [project, setProject] = useState({
    name: "",
    description: ""
  });

  const [projects, setProjects] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleProjectChange = (e) => {

    setProject({
      ...project,
      [e.target.name]: e.target.value
    });

  };

  const handleTaskChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };

  const handleProjectSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/projects",
        project
      );

      alert("Project Created Successfully");

      fetchProjects();

      setProject({
        name: "",
        description: ""
      });

    } catch (err) {

      console.log(err);

      alert("Error Creating Project");

    }

  };

  const handleTaskSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/tasks",
        task
      );

      alert("Task Created Successfully");

      setTask({
        title: "",
        description: ""
      });

    } catch (err) {

      console.log(err);

      alert("Error Creating Task");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Dashboard</h1>

      <h2>Create Project</h2>

      <form onSubmit={handleProjectSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={project.name}
          onChange={handleProjectChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={project.description}
          onChange={handleProjectChange}
        />

        <br /><br />

        <button type="submit">
          Create Project
        </button>

      </form>

      <hr />

      <h2>Projects</h2>

      {

        projects.map((item) => (

          <div
            key={item._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{item.name}</h3>

            <p>{item.description}</p>

          </div>

        ))

      }

      <hr />

      <h2>Create Task</h2>

      <form onSubmit={handleTaskSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleTaskChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleTaskChange}
        />

        <br /><br />

        <button type="submit">
          Create Task
        </button>

      </form>

    </div>

  );

}

export default Dashboard;