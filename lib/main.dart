import 'package:flutter/material.dart';
import 'reminder.dart';
import 'recipes.dart';
import 'groceryList.dart';
import 'myPlan.dart';
import 'feedback.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  final appTitle = "Salwaa's Menu Planner";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {

     Widget textSection = Container(
      padding: const EdgeInsets.all(32),
      child: Text(
       "Cape Malay and Other Recipes\nPlan your menu for the next few days/weeks\nNo more DAILY deciding for busy homes",
        softWrap: true,
        textAlign: TextAlign.center,
      ),
    );

    Color color = Theme.of(context).primaryColor;

    Widget buttonSection = Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildButtonColumn(color, Icons.mail, 'FEEDBACK OR SUGGESTIONS'),
        ],
      ),
    );

    return Scaffold(
      appBar: AppBar(title: Text(title)),
        body: ListView(
          children: [
           textSection,
             Image.asset(
              'images/home.jpg',
              width: 600,
              height: 300,
              fit: BoxFit.cover,
            ),
            buttonSection,
          ],
        ),
      drawer: Drawer(  
        child: ListView(
          // Important: Remove any padding from the ListView.
         // padding: EdgeInsets.zero, 
          children: <Widget>[
            DrawerHeader(
              child: Text("Salwaa's Menu Planner"),
              
              decoration: BoxDecoration(
                color: Colors.blue,
                
              ),
            ),
            ListTile(
              title: Text('Recipes'),
              onTap: () {
                   Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => RecipesRoute()),
            );
              },
            ),
            ListTile(
              title: Text('My Plan'),
              onTap: () {
                   Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => MyPlanRoute()),
            );
              },
            ),
             ListTile(
              title: Text('Feedback'),
              onTap: () {
                    Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => FeedbackRoute()),
            );
              },
            ),
             ListTile(
              title: Text('Grocery List'),
              onTap: () {
                Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => GrocerylistRoute()),
            );
              },
              
            ),
             ListTile(
              title: Text('Reminder'),
              onTap: () {
                  Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => ReminderRoute()),
            );
              },
            ),
             ListTile(
              title: Text('Load More'),
              onTap: () {

                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}

  Row _buildButtonColumn(Color color, IconData icon, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
     mainAxisAlignment: MainAxisAlignment.center,

      children: [
        Icon(icon, color: color,),
        Container(
          margin: const EdgeInsets.only(left: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: color,
            ),
            textAlign: TextAlign.left,
          ),
        ),
      ],
    );
  }