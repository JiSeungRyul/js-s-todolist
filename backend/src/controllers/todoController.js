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

const getTodo = (req, res) => {
    const { itemDate } = req.body;
    
    const tmp_usr_id = 1; //Must be modified to usr_id later
    console.log(itemDate);
    const getTitleQry = 'SELECT list_id FROM TODOLISTS WHERE DATE(reg_date) = DATE(?) AND usr_id = ?';
    pool.query(getTitleQry, [itemDate, tmp_usr_id], (getTitleErr, getTitleRslt) => {
        if (getTitleErr) {
            console.error('MySQL Select Error: ', getTitleErr);
            return res.status(500).json({ getTitleErr: 'Database error' });
        }
        let listId;
        if (getTitleRslt.length > 0){
            listId = getTitleRslt[0].list_id;

            const getItemQry = 'SELECT item_id, item_title, is_cpt, due_date FROM TODOITEMS WHERE list_id = ? AND is_deleted = 0';

            pool.query(getItemQry, [listId], (getItemErr, getItemRslt) => {
                if (getItemErr) {
                    console.error('MySQL Select Error: ', getItemErr);
                    return res.status(500).json({ getItemErr: 'Database error' });
                }

                return res.status(200).json({
                    message: 'Item got successfully',
                    list_id: listId,
                    items: getItemRslt
                });
            })
        } else {
            return res.status(204).json({ message: 'No items found' });;
        }
    });
}

const delTodo = (req, res) => {
    const itemId = req.params.itemId;
    const { listId } = req.body;

    const uptDelItemQry = 'UPDATE TODOITEMS SET is_deleted = 1 WHERE list_id = ? AND item_id = ?';

    pool.query(uptDelItemQry, [listId, itemId], (uptErr, uptRslt) => {
        if (uptErr) {
            console.error('MySQL Update Error: ', uptErr);
            return res.status(500).json({ uptErr: 'Database error' });
        }
        return res.status(200).json({ message: 'Todo item deleted successfully' });
    });
}

const uptTodoDone = (req, res) => {
    const itemId = req.params.itemId;
    const { listId, isCpt } = req.body;

    const uptDoneTodo = 'UPDATE TODOITEMS SET is_cpt = ? WHERE list_id = ? AND item_id = ?';

    pool.query(uptDoneTodo, [isCpt, listId, itemId], (uptErr, uptRslt) => {
        if (uptErr) {
            console.error('MySQL Update Error: ', uptErr);
            return res.status(500).json({ uptErr: 'Database error' });
        }
        return res.status(200).json({ message: 'Todo completed updated successfully' });
    });
}

module.exports = {
    addTodo,
    getTodo,
    delTodo,
    uptTodoDone
};