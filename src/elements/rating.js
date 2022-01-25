




function getStars (rating) {
    let stars = ratingToStars(rating);
    return `
    <div class= "item-footer">
          ${Array(stars["filledStars"]).fill(undefined).map((u,i) => $h`
            <i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_fill</i>
            `)}
            ${Array(stars["halfFilledStars"]).fill(undefined).map((u,i) => $h`
            <i class="f7-icons" style="font-size: 18px; color: #FFE900;">star_lefthalf_fill</i>
            `)}
            ${Array(stars["emptyStars"]).fill(undefined).map((u,i) => $h`
            <i class="f7-icons" style="font-size: 18px; color: #FFE900;">star</i>
            `)}
    </div>
    `;
}



function ratingToStars(rating){
    let filledStars = 0;
    let halfFilledStars = 0;
    let emptyStars =5;

    if (rating == null){
      return {"filledStars" : 0,"halfFilledStars": 0,"emptyStars":0};
    }else{
      filledStars = parseInt(rating.toFixed(1));
      let delta = (rating - filledStars);
      //<=0.25 ~ kein ster <=0.75 ~ halber stern >0.75 ~stern
      if (delta > (0.75)) {
        filledStars += 1
      }else if(delta > (0.25)){
        halfFilledStars = 1
      }
      emptyStars = 5 - filledStars - halfFilledStars;
    }
    //console.log ({"filledStars" : filledStars,"halfFilledStars": halfFilledStars,"emptyStars":emptyStars});
    return {"filledStars" : filledStars,"halfFilledStars": halfFilledStars,"emptyStars":emptyStars};
}

export default getStars;