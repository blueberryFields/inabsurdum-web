SELECT MAX(arr_sequence_no) 
FROM song_part WHERE id  
IN(SELECT id FROM song_part WHERE arrangement_id = 153);