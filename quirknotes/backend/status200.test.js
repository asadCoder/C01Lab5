const SERVER_URL = "http://localhost:4000";

// test("1+2=3, empty array is empty", () => {
// 	expect(1 + 2).toBe(3);
// 	expect([].length).toBe(0);
//   });

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});


test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
	
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotes.status).toBe(200);
	expect(getAllNotesJ.response).toStrictEqual([]);
  });


  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

  	const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotes.status).toBe(200);
	expect(getAllNotesJ.response.length).toBe(2);
  });


  
  test("/deleteNote - Delete a note", async () => {

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteBody = await postNoteRes.json();
	const id = postNoteBody.insertedId;

	const deleteANote = await fetch(`http://localhost:4000/deleteNote/${id}`, {
		method: "DELETE"
	  });

	const deleteANoteR = await deleteANote.json();
	expect(deleteANote.status).toBe(200);

	expect(deleteANoteR.response).toBe(`Document with ID ${id} deleted.`);

  	});




 test("/patchNote - Patch with content and title", async () => {
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	});

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteBody = await postNoteRes.json();
	const id = postNoteBody.insertedId;

	const patchNote = await fetch(`http://localhost:4000/patchNote/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			title: 1,
			content: "changed",
		  }),
	});
	
	// const patchNodeR = await patchNode.json();
	expect(patchNote.status).toBe(200);

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotesJ.response[0].title).toBe(1);
	expect(getAllNotesJ.response[0].content).toBe("changed");
	
  });
  
  test("/patchNote - Patch with just title", async () => {
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	});

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteBody = await postNoteRes.json();
	const id = postNoteBody.insertedId;

	const patchNote = await fetch(`http://localhost:4000/patchNote/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			title: 1
		}),
	});
	
	// const patchNodeR = await patchNode.json();
	expect(patchNote.status).toBe(200);

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotesJ.response[0].title).toBe(1);
  });

  
  test("/patchNote - Patch with just content", async () => {
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	});

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteBody = await postNoteRes.json();
	const id = postNoteBody.insertedId;

	const patchNote = await fetch(`http://localhost:4000/patchNote/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			content: "changed"
		  }),
	});
	
	// const patchNodeR = await patchNode.json();
	expect(patchNote.status).toBe(200);

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotesJ.response[0].content).toBe("changed");
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
	// Code here

	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	expect(deleteAll.status).toBe(200);

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});


	const deleteANote = await fetch(`http://localhost:4000/deleteAllNotes`, {
		method: "DELETE"
	});

	const deleteANoteR = await deleteANote.json();
	expect(deleteANote.status).toBe(200);

	expect(deleteANoteR.response).toBe("1 note(s) deleted.");
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
	// Code here
	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	expect(deleteAll.status).toBe(200);

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});


	const deleteANote = await fetch(`http://localhost:4000/deleteAllNotes`, {
		method: "DELETE"
	});

	const deleteANoteR = await deleteANote.json();
	expect(deleteANote.status).toBe(200);

	expect(deleteANoteR.response).toBe("3 note(s) deleted.");
  });


  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

	const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	});

	
  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
	  color: "#FFFFFF"
    }),
  	});

	const res = await postNoteRes.json();
	const id = res.insertedId;

	const patchCo = await fetch(`${SERVER_URL}/updateNoteColor/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			color: "#FF0000"
		  }),
	});

	
	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotesJ.response[0].color).toBe("#FF0000");

  });