package com.nagarro.service.serviceinterface;

import java.util.List;

import com.nagarro.entity.Notes;

public interface NotesServiceInterface {
	public void addNote(Notes note, int userid);
	public List<Notes> getLatestNotesByUserId(int userid);
	public void deleteNote(int noteid);
	public void updateNote(Notes note,int nid);
	public Notes getSpecificNote(int noteid);

}
