function updateNewTodo(SET_NEW_TODO, event) {
    SET_NEW_TODO(event.target.value);
}

function deleteTodo(patchDelTodo, getTodo, itemId) {
    patchDelTodo({ itemId })
        .then(() => {
            return getTodo();
        })
        .catch((error) => {
            console.error('Error in deleteTodo:', error);
        });
}

function updateCpltStatus(patchDoneTodo, getTodo, itemId, isCompleted) {
    const isCpt = isCompleted ? 'Y' : 'N';
    patchDoneTodo({ itemId, isCpt })
        .then(() => {
        return getTodo();
        })
        .catch((error) => {
        console.error('Error in patchChkCplt:', error);
        });
}

export {
    updateNewTodo,
    deleteTodo,
    updateCpltStatus
}