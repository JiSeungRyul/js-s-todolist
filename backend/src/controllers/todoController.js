const pool = require('../config/db');

const addTodo = (req, res) => {
    const { itemTitle, dueDate } = req.body;
    const todayTitle = new Date().toISOString().slice(0, 10);

    const tmp_usr_id = 1; //Must be modified to usr_id later
    
    const putItem = (listId) => {
        const putItemQry = 'INSERT INTO TODOITEMS(list_id, item_title, due_date) VALUES (?, ?, ?)';

        pool.query(putItemQry, [listId, itemTitle, dueDate], (putErr, putRslt) => {
            if (putErr) {
                console.error('MySQL Insert Error: ', putErr);
                return res.status(500).json({ putErr: 'Database error' });
            }

            const getItemQry = 'SELECT item_id, item_title, is_cpt, due_date FROM TODOITEMS WHERE list_id = ? AND is_deleted = 0';

            pool.query(getItemQry, [listId], (getErr, getRslt) => {
                if (getErr) {
                    console.error('MySQL Insert Error: ', getErr);
                    return res.status(500).json({ getErr: 'Database error' });
                }

                return res.status(201).json({
                    message: 'Item added successfully',
                    list_id: listId,
                    items: getRslt
                });
            });
        });
    }
    
    const GetTitleQry = 'SELECT list_id FROM TODOLISTS WHERE DATE(reg_date) = CURDATE() AND usr_id = ?';

    pool.query(GetTitleQry, [tmp_usr_id], (getErr, getRslt) => {
        if (getErr) {
            console.error('MySQL Insert Error: ', getErr);
            return res.status(500).json({ getErr: 'Database error' });
        }

        let listId;
        if (getRslt.length > 0) {
            //When list exists
            listId = getRslt[0].list_id;
            putItem(listId);
        } else {
            //When the list does not exist
            const putTitleQry = 'INSERT INTO TODOLISTS(usr_id, list_title) VALUES (?, ?)';
            
            pool.query(putTitleQry,[tmp_usr_id, todayTitle], (putErr, putRslt) => {
                if (putErr) {
                  console.error('MySQL Insert Error: ', putErr);
                  return res.status(500).json({ putErr: 'Database error' });
                } 
                listId = putRslt.insertId;
                putItem(listId);
            });
            return;
        }
    });
}

// exports.createTodoItem
// exports.getTodoTitle
// exports.getTodoItems

module.exports = {
    addTodo,
};