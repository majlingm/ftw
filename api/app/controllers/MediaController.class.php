<?php
// Protect from direct access.
defined('API_GUARD') or die('Access denied');

class MediaController {
	    
    //The constructor.
    function __construct() {
    }
	
	
	function addMedia(&$parameters) {
        $sql = "INSERT INTO
                    Media (title, description, filename)
                VALUES 
                    ('" . $parameters['title'] . "', 
                    '" . $parameters['description'] . "', 
                    '" . $parameters['filename'] . "')";

        $result = Database::query($sql);
     
        if($result) {
            result("Media added");
        } else {
            failed("unable to add media");
        }
	}

	function updateMediaTitle(&$parameters) {
        $sql = 'UPDATE Media
        		SET
                   title = "' . $parameters['value'] . '" 
				WHERE
           			id=' . $parameters['id'];

        $result = Database::query($sql);
     
        if($result) {
            result("Media title saved");
        } else {
            failed("unable to save media title");
        }
	}
	function updateMediaDescription(&$parameters) {
        $sql = 'UPDATE Media
        		SET
                   description = "' . $parameters['value'] . '" 
				WHERE
           			id=' . $parameters['id'];

        $result = Database::query($sql);
     
        if($result) {
            result("Media description saved");
        } else {
            failed("unable to save media description");
        }
	}
	
    function getMediaList(&$parameters) {
        $sql = "
            SELECT
               Media.id,
               Media.title,
               Media.description,
               Media_labels.title AS label,
               Media_labels.id AS label_id
            FROM
                Media
            LEFT JOIN
            	Media_has_Media_labels ON Media.id = Media_has_Media_labels.Media_id
            LEFT JOIN 
            	Media_labels ON Media_has_Media_labels.Media_labels_id = Media_labels.id
            WHERE 
            	Media.deleted IS NULL";        
        
        $result_array = Database::query($sql);
        $media_items = array();
        while($result = $result_array->next()){
            array_push($media_items, $result);
        }
        
        if(count($media_items) > 0){
            result("Media items found", array('data' => $media_items));
            return true;
        }

        failed('No media items found');
        return false;	
    }
	/*
	 * Lables
	 */
	function getMediaLabelList(&$parameters) {		
        $sql = "
            SELECT
				*
            FROM
                Media_labels
            WHERE 
            	deleted IS NULL";
        
        $result_array = Database::query($sql);
        $label_items = array();
        while($result = $result_array->next()){
            array_push($label_items, $result);
        }
        
        if(count($label_items) > 0){
            result("Media items found", array('data' => $label_items));
            return true;
        }

        failed('No media items found');
        return false;	
    }
	
	function addLabel(&$parameters) {
        $sql = "INSERT INTO
                    Media_labels (title)
                VALUES 
                    ('" . $parameters['title'] . "')";

        $result = Database::query($sql);
     
        if($result) {
            result("Label added");
        } else {
            failed("Unable to add label");
        }
	}
	
	function addLabelToMedia(&$parameters) {
        $sql = 'INSERT INTO
                    Media_has_Media_labels (Media_labels_id,Media_id)
                VALUES 
                    (' . $parameters['mediaLabelId'] . ',' . $parameters['mediaId'] . ')';

        $result = Database::query($sql);
     
        if($result) {
            result('Label added to media');
        } else {
            failed('Unable to add label to media');
        }
	}
	function removeLabelFromMedia(&$parameters) {
        $sql = 'DELETE FROM
        			Media_has_Media_labels
       			WHERE
                    Media_labels_id =' . $parameters['mediaLabelId'] . ' AND
                    Media_id =' . $parameters['mediaId'];

        $result = Database::query($sql);
     
        if($result) {
            result('Label removed to media');
        } else {
            failed('Unable to remove label to media');
        }
	}
}
