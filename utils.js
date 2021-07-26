import chalk from 'chalk';
import fs from 'fs';

const getNotesArray = () => {
    if (!fs.existsSync('notes.json') || !isJSON(fs.readFileSync('notes.json').toString())) {
        fs.writeFileSync('notes.json', '[]');
    }
    return JSON.parse(fs.readFileSync('notes.json').toString());
}
const isJSON = (data) => {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}
const addNote = (title, body) => {
    const notesArray = getNotesArray();
    if (notesArray.filter(note => note.title === title).length === 0) {
        const newNote = {
            title,
            body
        };
        notesArray.push(newNote);
        saveNotes(notesArray);
        console.log('Note added!');
    } else {
        console.log('Note title duplicated!');
    }
}

const removeNote = (title) => {
    const notesArray = getNotesArray();
    const noteIndex = notesArray.findIndex(note => note.title === title)
    if (noteIndex === -1) {
        console.log(chalk.bgRed("Note not found!"));
    } else {
        notesArray.splice(noteIndex, 1);
        saveNotes(notesArray);
        console.log(chalk.bgGreen("Note succesfully deleted!"));
    }
}

const readNote = (title) => {
    const notesArray = getNotesArray();
    const note = notesArray.find(note => note.title === title);
    if (note) {
        console.log("Title: ", note.title);
        console.log("Body: ", note.body);
    } else {
        console.log("No note found!");
    }
}

const listNotes = () => {
    const notesArray = getNotesArray();
    if (notesArray.length > 0) {
        notesArray.forEach(note => {
            console.log("\n", note.title);
        });
    } else {
        console.log("No notes found!");
    }
}

const saveNotes = (data) => {
    fs.writeFileSync('notes.json', JSON.stringify(data));
}

const methods = {
    getNotesArray,
    addNote,
    removeNote,
    readNote,
    listNotes
};

export default methods;