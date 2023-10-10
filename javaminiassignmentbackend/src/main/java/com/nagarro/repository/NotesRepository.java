package com.nagarro.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.nagarro.entity.Notes;
import com.nagarro.entity.User;



@Repository
public interface NotesRepository extends JpaRepository<Notes, Integer>{
	List<Notes> findTop10ByUserOrderByDateCreatedDesc(Optional<User> user);
	
	@Transactional
    @Modifying
    @Query("DELETE FROM Notes n WHERE n.id = ?1")
    void deleteNoteById(int noteId);

}
