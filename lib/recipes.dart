import 'package:flutter/material.dart';


class RecipesRoute extends StatelessWidget {
  @override


   // List<String> images = ["https://placeimg.com/500/500/any", "https://placeimg.com/500/500/any", "https://placeimg.com/500/500/any", "https://placeimg.com/500/500/any", "https://placeimg.com/500/500/any"];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Recipes Page"),
          centerTitle: true,
          backgroundColor: Colors.red,
        ),
        body: Container(
          padding: EdgeInsets.all(16.0),
          child: GridView.extent(
            maxCrossAxisExtent: 200,
            crossAxisSpacing: 4.0,
            mainAxisSpacing: 4.0,
            children: <Widget>[
              Image.network("https://www.kennedymm.co.za/wp-content/uploads/2019/03/chicken-biryani.jpg"),
              Image.network("https://ukcdn.ar-cdn.com/recipes/port500/e8ce5938-66ae-4f43-91c4-c30d00e45ad9.jpg"),
              Image.network("https://4.bp.blogspot.com/-G73Es-UgKgo/UM20SM1sdRI/AAAAAAAAOuc/8wq9rx2WeCA/s400/mmfcf3.jpg"),
              Image.network("https://www.thegluttonlife.com/wp-content/uploads/2019/08/perkedel-jagung-corn-fritter-06.jpg"),
            ],        )
        ),
       

      ),
    );
  }
  
}
