import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Layouts/Admin/AdminLayout';
import ProjectsTable from '../../components/Projects/ProjectsTable';

import { useLazyQuery } from "@apollo/client";

import { GET_ALL_PROJECTS } from "../../models/Project";

const Project = () => {

    const [handleFetchAllProjects] = useLazyQuery(GET_ALL_PROJECTS, {fetchPolicy: 'network-only'});

    const [loading, setLoading] = useState(false);
    const [projects, setProject] = useState([]);

    const handleFetchProject = async () => {
        try{
            setLoading(true);
            const responseAllProjects = await handleFetchAllProjects();
            setProject(responseAllProjects.data.projects);
        }catch{
            setProject([]);
        }finally{
            setLoading(false);
        }
    };

    const intialize = async () => {
        await handleFetchProject();
    };

    useEffect(() => {
        let mounted = true;

        if(mounted) intialize();

        return () => {
            mounted  = false;
        }
    }, []);

    return (
        <AdminLayout pageTitle="Projects">
            <section>
                <ProjectsTable projects={projects} loading={loading} />
            </section>
        </AdminLayout>
    );
};

export default Project;