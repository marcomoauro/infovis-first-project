# Infovis First Project

First project of *Visualizzazione delle Informazioni* at Roma Tre University.

Follow this link, https://marcomoauro.github.io/, to see a demo.

To run the project in a local environment run this script:
 ```
 git clone https://github.com/marcomoauro/infovis-first-project.git
 cd infovis-first-project
 python -m http.server <port>
 ```
 Now open the browser at localhost:<**port**> and enjoy :)
 
Exercise:  
Create a JSON file with multivariate data: there are 10 data-point and 
each data-point have five quantitative variables wich the values are all positives.
With these data drow 10 isosceles triangle into drawing area (each triangle corresponds at one data-point).
First variable determine the horizontal position of the triangle, the second variable determine the vertical
position, third variable determine the base length, fourth variable determines the lenght of the others two sides
and the fifth variable determina the hue of the fill.

With a left click on a characteristic the corresponding variable is used for the horizontal position and
the variable used for the horizontal position is used for the specific characteristic (for all the triangles).

With a right click we have the same behavior respect to the variable x.

The changes of dimension, position and color of the triangles they have to happens with a fluid animation.
