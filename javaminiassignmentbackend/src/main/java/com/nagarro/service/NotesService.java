package com.nagarro.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.entity.Notes;
import com.nagarro.entity.User;
import com.nagarro.repository.NotesRepository;
import com.nagarro.repository.UserRepository;
import com.nagarro.service.serviceinterface.NotesServiceInterface;

import java.util.Date;
import java.util.List;
@Service
public class NotesService implements NotesServiceInterface{
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	NotesRepository noteRepository;

	//to post note
	@Override
	public void addNote(Notes note, int userid) {
		// TODO Auto-generated method stub
		 Optional<User> userOptional = userRepository.findById(userid);
	     userOptional.ifPresent(note::setUser);
	     noteRepository.save(note);
	}
	
	//to get latest notes
	@Override
	public List<Notes> getLatestNotesByUserId(int userid){
		Optional<User> userOptional = userRepository.findById(userid);
		if (userOptional.isPresent()){
            List<Notes> noteList = noteRepository.findTop10ByUserOrderByDateCreatedDesc(userOptional);
            return noteList;
		}
		return null;
		
	}

	//to delete note
	@Override
	public void deleteNote(int noteid) {
		// TODO Auto-generated method stub
		noteRepository.deleteNoteById(noteid);
		
	}

	//to update note
	@Override
	public void updateNote(Notes note,int nid) {
		// TODO Auto-generated method stub
		Optional<Notes> n=noteRepository.findById(nid);
		if (n.isPresent()) {
	        Notes updatedNote = n.get();
	        updatedNote.setTitle(note.getTitle());
	        updatedNote.setDescription(note.getDescription());
	        updatedNote.setDateCreated(new Date()); 
	        noteRepository.save(updatedNote);
	    } 
		
		
		
	}

	//to get particular note
	@Override
	public Notes getSpecificNote(int noteid) {
		// TODO Auto-generated method stub
		Optional<Notes> n=noteRepository.findById(noteid);
		if (n.isPresent()) {
	        Notes note = n.get();
	        return note;
		}
		return null;
	}
	

}
