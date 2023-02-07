import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from "../../mockData"
import { Card } from "../card/Card"
import { useState } from 'react'
import "./kanban.scss"

export function Kanban(){

    const [data, setData] = useState(mockData)
    //Definimos lo que ocurrirá si arrastro la etiqueta fuera del contexto:
    const onDragEnd = (result)=>{
        if(!result.destination) return
        //Capturamos el source y destination en la variable result porque DragDropContext reconoce si estás arrastrando o si has soltado. El source es para saber en qué evento me encuentro actualmente y el destination para saber el área de destino.
        const {source,destination} = result
        if(source.droppableId !==destination.droppableId){
            const sourceColIndex = data.findIndex(i=>i.id===source.droppableId)
            const destinationColIndex = data.findIndex(i=>i.id===destination.droppableId)
            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]
            
            //[...] Nos permite copiar un elemento array u object. En este caso lo hacemos para poder mapear (entrar a sus registros) puesto que queremos llegar a task. Capturamos la lista (sourceCol) y a continuación capturamos task.
            const sourceTask = [...sourceCol.task]
            const destinationTask = [...destinationCol.task]

            //Le decimos que remueva el elemento de una lista y que el elemento removido lo reciba la siguiente lista.
            const[removed] = sourceTask.splice(source.index,1)
            destinationTask.splice(destination.index,0,removed)

            //Actualizamos los datos anteriores
            data[sourceColIndex].task = sourceTask
            data[destinationColIndex].task = destinationTask

            //Para que actualice solo estado de la tarjeta y no toda la página
            setData(data)
        }
    }

    return(
        //Según la librería, DragDropContext sirve como container para que el "arrastrar y soltar" funcione dentro de esta área 
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='kanban'>
                {data.map((section)=>(
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided)=>(
                            <div {...provided.droppableProps} className='kanban__section' ref={provided.innerRef}>
                                <div className='kanban__section__title'>
                                    {section.title}
                                </div>
                                <div className='kanban__section__content'>
                                    {section.task.map((task,index)=>(
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided,snapshot)=>(
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{...provided.draggableProps.style,opacity:snapshot.isDragging?"0.5":"1"}}>
                                                <Card>{task.title}</Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}