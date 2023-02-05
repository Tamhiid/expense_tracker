


function showModal(){
    $("#addOrEdit").modal('show')
}



function Edit(id, title, amount, type){
    $("#op").val('U')
    $("#id").val(id)
    $("#title").val(title)
    $("#amount").val(amount)
    $("#type").val(type).change()

    $("#addOrEdit").modal('show')
}

