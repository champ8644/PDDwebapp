#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<ctime>
#include<conio.h>
using namespace std;

struct Point {
   int x, y;
   Point& operator= (const Point& o) {
      x = o.x;
      y = o.y;
      return *this;
   }
   bool operator== (const Point& o) {
    return ((x == o.x) and (y == o.y));
   }

   int convertPointToNum () {
      return (2-y)*3+x;
   }
   void printpoint () {
      printf("(%d,%d)",x,y);
   }
};

struct line {
   Point p1, p2;
   line& operator= (const line& o) {
      p1 = o.p1;
      p2 = o.p2;
      return *this;
   }
   void printline () {
      printf("{");
      p1.printpoint();
      printf(",");
      p2.printpoint();
      printf("}");
   }
   void printline2 () {
      printf("\n");
      for (int y=2;y>=0;y--) {
         for (int x=0;x<3;x++) {
            printf("%c ",(((p1.x==x)&&(p1.y==y))||((p2.x==x)&&(p2.y==y)))?'x':'o');
         }
         printf("\n");
      }
   }
   bool shareEndPoint (const line& o) {
      if (p1==o.p1)
        return true;
      if (p1==o.p2)
        return true;
      if (p2==o.p1)
        return true;
      if (p2==o.p2)
        return true;
      return false;
   }
};

struct Point convertNumToPoint (int x) {
    Point p;
    p.x = (x%3);
    p.y = 2-(x/3);
    return p;
};

line newLine (int a,int b) {
    Point p1 = convertNumToPoint(a);
    Point p2 = convertNumToPoint(b);
    struct line l = {{p1.x,p1.y},{p2.x,p2.y}};
    return l;
}

int abs (int x) {
    if (x<0)
        return -x;
    return x;
}

bool isL_moveDisabled,
     isCrossingDisabled,
     isSkippingPastDeadDotDisabled,
     isSkippingDisabled;
int minN,
    maxN;
int state[20],answerquery[20];
struct line linelists[20];

bool onLine(line l1, Point p) {   //check whether p is on the line or not
   if(p.x <= max(l1.p1.x, l1.p2.x) && p.x <= min(l1.p1.x, l1.p2.x) &&
      (p.y <= max(l1.p1.y, l1.p2.y) && p.y <= min(l1.p1.y, l1.p2.y)))
      return true;
   return false;
}

int direction(Point a, Point b, Point c) {
   int val = (b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y);
   if (val == 0)
      return 0;     //colinear
   else if(val < 0)
      return 2;    //anti-clockwise direction
      return 1;    //clockwise direction
}

bool isIntersect(line l1, line l2) {
   //four direction for two lines and points of other line
   int dir1 = direction(l1.p1, l1.p2, l2.p1);
   int dir2 = direction(l1.p1, l1.p2, l2.p2);
   int dir3 = direction(l2.p1, l2.p2, l1.p1);
   int dir4 = direction(l2.p1, l2.p2, l1.p2);

   if (l1.shareEndPoint(l2))
      return false;

   if(dir1 != dir2 && dir3 != dir4)
      return true; //they are intersecting
   if(dir1==0 && onLine(l1, l2.p1)) //when p2 of line2 are on the line1
      return false;
   if(dir2==0 && onLine(l1, l2.p2)) //when p1 of line2 are on the line1
      return false;
   if(dir3==0 && onLine(l2, l1.p1)) //when p2 of line1 are on the line2
      return false;
   if(dir4==0 && onLine(l2, l1.p2)) //when p1 of line1 are on the line2
      return false;

   return false;
}

bool isL_move (int a,int x,int d) {
    Point p = convertNumToPoint(x);
    Point q = convertNumToPoint(a);
    if ((abs(p.x-q.x)==2) and (abs(p.y-q.y)==1))
        return true;
    if ((abs(p.x-q.x)==1) and (abs(p.y-q.y)==2))
        return true;
    return false;
}

bool isCrossing (int a,int x,int d) {
    line l1 = newLine(x,a);
    int i;
    for (i=1;i<d;i++) {
        if(isIntersect(l1,linelists[i])) {/*
            printf("Invalid Crossing: \n");
            l1.printline2();
            linelists[i].printline2();
            printf("\n");*/
            return true;
        }
    }
    return false;
}

bool isSkipping(int a,int x,int d) {
    Point p = convertNumToPoint(x);
    Point q = convertNumToPoint(a);
    Point r;
    bool skipping = false;
    if ((abs(p.x-q.x)==2) and (abs(p.y-q.y)!=1)) {
        skipping = true;
    }
    if ((abs(p.x-q.x)!=1) and (abs(p.y-q.y)==2)) {
        skipping = true;
    }
    r.x = (p.x+q.x)/2;
    r.y = (p.y+q.y)/2;
    if (skipping) {
        if (isSkippingPastDeadDotDisabled or (state[r.convertPointToNum()]==0))
        {
            line l = newLine(x,a);
            printf("Invalid skipping:\n");
            l.printline2();
            printf("\n");
            return true;
        }
    }
    return false;
}

bool valid (int a,int x,int d) {
    if (isL_moveDisabled) {
        if (isL_move(a,x,d))
        {/*
            printf("\t\tInvalid L_move: ");
            line p = newLine(x,a);
            p.printline();
            printf("\n");*/
            return false;
        }
    }
    if (isCrossingDisabled) {
        if (isCrossing(a,x,d))
            return false;
    }
    if (isSkippingDisabled) {
        if (isSkipping(a,x,d))
            return false;
    }
    if (state[a])
        return false;
    return true;
}

void printout (int index,int depth) {
    int i,j;
    printf("state:\n");
    for (i=0;i<3;i++) {
        for (j=0;j<3;j++) {
            printf("%d ",state[3*i+j]);
        }
        printf("\n");
    }
    printf("\nanswerquery:\n");
    for (i=0;i<depth;i++)
        printf("%d -> ",answerquery[i]);
    printf("\n\nlinelists\n");
    for (i=0;i<depth;i++)
    {
        linelists[i].printline();
        printf("\t");
    }
    printf("\n\n");
    printf("index: %d, depth: %d\n",index,depth);
    printf("minN: %d, maxN: %d\n",minN,maxN);
    printf("%d %d %d %d\n",isL_moveDisabled,
     isCrossingDisabled,
     isSkippingPastDeadDotDisabled,
     isSkippingDisabled);
    printf("=============================================\n");
    getch();
}

bool searching (int index, int depth) {
    printout(index,depth);
    if (depth>=maxN)
        return true;
    int i,randlist[10],r,c=0,theChoosenOne;
    char arrtemp[10];
    for (i=0;i<9;i++)
    {
        if (state[i]==1)
            arrtemp[i] = 'x';
        else
            arrtemp[i] = '/';
    }
    for (i=0;i<9;i++) {
        if (valid(i,index,depth))
        {
            arrtemp[i] = 'o';
            randlist[c++] = i;
        }
    }
    printf("\nvalidity: \n");
    for (i=0;i<3;i++){
        for (int j=0;j<3;j++)
            printf("%c ",arrtemp[i*3+j]);
    printf("\n");
}
    printf("\n");
    while (c>0) {
        printf("\trandlist (num=%d) : (",c);
        for (int j=0;j<c;j++)
            printf("%d,",randlist[j]);
        printf(")\n");
        r = rand()%c;
        theChoosenOne = randlist[rand()%c];
        for (i=r+1;i<c;i++) {
            randlist[i-1] = randlist[i];
        }
        randlist[c--] = 0;
        state[theChoosenOne] = 1;
        answerquery[depth] = theChoosenOne;
        linelists[depth] = newLine(index,theChoosenOne);
        printf("\ttheChoosenOne is : %d!!!\n",theChoosenOne);
        printf("=============================================\n\n");
        if (searching(theChoosenOne,depth+1)) // answer found
            return true;
        state[theChoosenOne] = 0;
        answerquery[depth] = 0;
    };
    if (depth>=minN)
        return true;
    return false;
}

int* Randomized9PointsPattern(int a, int b) {
    //config
    isL_moveDisabled = true;
    isCrossingDisabled = true;
    isSkippingDisabled = true;
    isSkippingPastDeadDotDisabled = true;
    // set max/min randomization
    if (a < 0)
        a = 0;
    minN = a;
    if (b > 9)
        b = 9;
    maxN = b;
    // clear state
    for (int i=0;i<20;i++) {
        answerquery[i] = -1;
        state[i] = 0;
    }

    int r = rand()%9;
    state[r] = 1;
    answerquery[0] = r;
    bool pass = searching (r,1);
    return answerquery;
}

int main () {
    srand(time(NULL));
    int *arr = Randomized9PointsPattern(4,7);
    cout << arr[0];
    for (int i=1;arr[i]>=0;i++)
        cout << " -> " << arr[i];
}
