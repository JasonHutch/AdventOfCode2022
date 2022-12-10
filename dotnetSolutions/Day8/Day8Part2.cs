using System.Collections.Generic;

namespace Advent_Of_Code_2022.Day8
{
    class Day8Part2
    {
        int[,] trees;
        int totalNum = 0;
        int totalNumRows = 0;
        int totalNumCols = 0;

        public void run()
        {
            string data = File.ReadAllText("./Day8/input.txt");
            string[] lines = data.Split("\r\n");
            int rows = lines.Count();
            int cols = lines[0].Length;
            totalNumCols = cols;
            totalNumRows = rows;

            trees = buildArray(rows, cols, lines);
            Console.WriteLine(findMaxScenicScore(trees));
        }

        public int[,] buildArray(int numRows, int numCols, string[] input)
        {
            int[,] array = new int [numRows, numCols];
            for(int row = 0; row < numRows; row++)
            {
                char[] currentLine = input[row].ToCharArray();
                for(int col = 0; col < numCols; col++)
                {
                    array[row, col] = Int16.Parse(currentLine[col].ToString());
                }
            }

            return array;
        }

        public int findMaxScenicScore(int[,] trees)
        {
            int maxScore = 0;
            for(int row = 0; row < totalNumRows; row++)
            {
                for(int col = 0; col < totalNumCols; col++)
                {
                    if(row ==  0 || row == totalNumRows - 1 || col == 0 || col == totalNumCols -1)
                    {
                        continue;
                    }

                    //Note to self: Can I create on function and pass a configuration object to reduce duplication?
                    int leftScore = lookLeft(row, col-1, trees[row,col]) ;
                    int rightScore = lookRight(row, col+1, trees[row,col]);
                    int upScore = lookUp(row-1, col, trees[row,col]);
                    int downScore = lookDown(row+1, col, trees[row,col]) ;

                    int scenicScore = leftScore * rightScore * upScore * downScore;
                     if(scenicScore > maxScore)
                     {
                        maxScore = scenicScore;
                     }
                }
            }
            return maxScore;
        }

        public int lookLeft(int row, int col, int target)
        {
            if (col == 0 || trees[row, col] >= target)
            {
                return 1;
            }

            return 1 + lookLeft(row, col-1, target);
        }

        public int lookRight(int row, int col, int target)
        {
            if (col == totalNumCols-1 || trees[row, col] >= target)
            {
                return 1;
            }

            return 1 + lookRight(row, col+1, target);
        }

        public int lookUp(int row, int col, int target)
        {
            if (row == 0 || trees[row, col] >= target)
            {
                return 1;
            }

            return 1 + lookUp(row-1, col, target);
        }
        public int lookDown(int row, int col, int target)
        {
            if (row == totalNumRows - 1 || trees[row, col] >= target)
            {
                return 1;
            }

            return 1 + lookDown(row+1, col, target);
        }
         public static void Print2DArray<T>(T[,] matrix)
        {
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    Console.Write(matrix[i,j] + "\t");
                }
                Console.WriteLine();
            }
        }
    }
}