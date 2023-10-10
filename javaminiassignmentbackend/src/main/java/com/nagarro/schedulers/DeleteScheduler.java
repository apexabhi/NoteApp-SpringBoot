package com.nagarro.schedulers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.nagarro.entity.Notes;
import com.nagarro.entity.User;
import com.nagarro.repository.NotesRepository;
import com.nagarro.repository.UserRepository;



//Scheduler to delete old notes every hour of each user
@Component
public class DeleteScheduler {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	NotesRepository noteRepository;
	
	@Scheduled(cron = "0 0 * * * *")
    public void scheduleTask()
    {
    	 List<User> users = userRepository.findAll();
         int limit = 10;

         for (User user : users) {
             Set<Notes> notes = user.getNotes();
             if (notes.size() > limit) {
                 List<Notes> notesToDelete = notes.stream()
                         .sorted((n1, n2) -> n2.getDateCreated().compareTo(n1.getDateCreated()))
                         .skip(limit)
                         .collect(Collectors.toList());

                 noteRepository.deleteAllInBatch(notesToDelete);;
             }
         }
         System.out.println("Records Deleted");
    }

}
