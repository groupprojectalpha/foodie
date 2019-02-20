const grid = 8

export function reorder(list, startIndex, endIndex){
        let result = Array.from(list)
        let [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

export const move = (sourceList, destLIst, targetSource, targetDest) => {
    const SLC = Array.from(sourceList)
    const DLC = Array.from(destLIst)

    const [removed] = SLC.splice(targetSource.index, 1)

    DLC.splice(targetDest.index, 0, removed)

    let result = {}
    result[targetSource.droppableId] = SLC
    result[targetDest.droppableId] = DLC
    return result
}


export const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid} px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle

})

export const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'rgba(1,1,1,0.2)' : 'lighgrey',
    padding: grid,
    height: '100%',
    minimumHeight: "25rem"
})