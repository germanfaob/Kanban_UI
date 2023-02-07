import {v4 as uuidv4} from "uuid"

const mockData = [
    {
        id: uuidv4(),
        title: "📋 Por hacer",
        task: [
            {
                id: uuidv4(),
                title: "Estudiar Flutter"
            },
            {
                id: uuidv4(),
                title: "Estudiar ReactJS"
            },
            {
                id: uuidv4(),
                title: "Hacer curso de VueJS"
            }
        ]
    },
    {
        id: uuidv4(),
        title: "✏️ En progreso",
        task: [
            {
                id: uuidv4(),
                title: "Estudiar Flutter"
            },
            {
                id: uuidv4(),
                title: "Estudiar ReactJS"
            }
        ]
    },
    {
        id: uuidv4(),
        title: "✔️ Completado",
        task: [
            {
                id: uuidv4(),
                title: "Curso HTML"
            },
            {
                id: uuidv4(),
                title: "Curso CSS"
            }
        ]
    }
];

export default mockData