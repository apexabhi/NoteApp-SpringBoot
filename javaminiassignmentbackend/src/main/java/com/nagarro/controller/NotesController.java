package com.nagarro.controller;

//importing packages
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.nagarro.entity.Notes;
import com.nagarro.service.NotesService;

@RestController
@CrossOrigin(origins = "*")
public class NotesController {
	@Autowired
	NotesService noteservice;
	
	//to post notes
	@PostMapping("notes/{userid}")
	public void createNote(@RequestBody Notes note, @PathVariable("userid") int userId){
		 noteservice.addNote(note, userId);
	}
	
	//to get latest 10 notes of user
	@GetMapping("notes/{userid}")
	public List<Notes> getLatestNotesOfUser(@PathVariable("userid") int userId){
		List<Notes> note=noteservice.getLatestNotesByUserId(userId);
		return note;
	}
	
	//to fetch specific note
	@GetMapping("notes/unique/{noteid}")
	public Notes getUniqueNote(@PathVariable("noteid") int noteId){
		Notes note=noteservice.getSpecificNote(noteId);
		return note;
	}
	
	//to delete note
	@DeleteMapping("notes/{noteid}")
	public void delete(@PathVariable("noteid") int noteid) {
		noteservice.deleteNote(noteid);
	}
	
	//to update note
	@PutMapping("notes/{noteid}")
	public void updateNote(@RequestBody Notes note, @PathVariable("noteid") int noteid) {
		noteservice.updateNote(note, noteid);
	}

}
