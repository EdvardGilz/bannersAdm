/*
 * Arreglos jQuery, exclusivos para caracterísitcas del tema
 */

	jQuery(document).ready(function($){
		
			
		// Sidebar izquierdo mostrar ocultar
			$("#show-sidebar-left").on('click',function(e) {
			        e.preventDefault();
			        $("#content").toggleClass("active-sidebar-left");
			});		
			
		// Botón Animado
			
			$(".c-hamburger").on('click',function(e) {
		        e.preventDefault();
		        $(this).toggleClass("is-active");
			});	
			
			          
	}); //fin JQuery()…
	
	
	
	
/* Extravagancias ñ_ñ */	
	
// Obtener la fecha y ponerla en el copyright (footer)
	
	var year = new Date().getFullYear();	
	var div = document.getElementById('copyDate');
	div.innerHTML = div.innerHTML + year;
	
	
/* Darle formato de bootstrap a los <inputs> de carga de archivos
 * fuente: https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
 */
	
	function btnCargaArchivo(){

		  // We can attach the `fileselect` event to all file inputs on the page
		  $(document).on('change', ':file', function() {
		    var input = $(this),
		        numFiles = input.get(0).files ? input.get(0).files.length : 1,
		        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		    input.trigger('fileselect', [numFiles, label]);
		  });

		  // We can watch for our custom `fileselect` event like this
		  $(document).ready( function() {
		      $(':file').on('fileselect', function(event, numFiles, label) {

		          var input = $(this).parents('.input-group').find(':text'),
		              log = numFiles > 1 ? numFiles + ' files selected' : label;

		          if( input.length ) {
		              input.val(log);
		          } else {
		              if( log ) alert(log);
		          }

		      });
		  });
		  
	}
	
	
	function previewBanner(){
        
		/* Preview en vivo para la seleccion del tamaño */   
		    
        $('#prevTamano').change(function(){
        	// buscame el valor seleccionado data-width y data-height
            var selected = $(this).find('option:selected');
            var banWidth = selected.data('width'); 
            var banHeight = selected.data('height'); 
            
            //al encontrarlo modifica el banner preview
            $('#previewBanner').css({ 
                "width" : banWidth,
                "height" : banHeight
            }); 
        }).change();


		/* Preview despues de dar click */  
        
        $('#previewAction').click(function(e) {
            e.preventDefault();

            var url = $("#prevUrl").val();
            var txtm = $("#prevTxt").val();
            var txtc = $("#prevColor").val();
            var bgc = $("#prevBGcolor").val();
                    
            console.log( url );                         
            console.log( txtm );                         
            console.log( txtc );                         
            console.log( bgc );    

            $('#previewBanner').wrap( '<a href="'+ url +'" target="_blank"></a>' );
            $('#previewBanner').html( txtm );
            $('#previewBanner').css({
            	"color" : txtc ,
            	"background-color" : bgc,
            	"padding" : "5px"
            });
            
            $('#previewCode').append( '<p>Distribuir código</p>' );
            $('#previewCode').append( '<textarea class="form-control"> &lt;a class="bixnia-banner" href="https://bixnia.com/banner/id?text='+txtm+'?url='+url+'"&gt; banner &lt;/a&gt; </textarea>' );
            
            

        }); 
		        
		  
	}	
	