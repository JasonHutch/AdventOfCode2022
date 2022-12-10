using System.Collections.Generic;

namespace Advent_Of_Code_2022.Day8
{
    class Day8
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
            int visibleTrees = countVisibleTrees(trees);
            Console.WriteLine(visibleTrees);
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

        public int countVisibleTrees(int[,] trees)
        {
            int numVisibleTrees = 0;
            for(int row = 0; row < totalNumRows; row++)
            {
                for(int col = 0; col < totalNumCols; col++)
                {
                    if(row ==  0 || row == totalNumRows - 1 || col == 0 || col == totalNumCols -1)
                    {
                        numVisibleTrees++;
                        continue;
                    }

                    //Note to self: Can I create on function and pass a configuration object to reduce duplication?
                    if(lookLeft(row, col, trees[row,col]))
                    {
                        numVisibleTrees++;
                        continue;
                    }
                    if(lookUp(row, col, trees[row,col]))
                    {
                        numVisibleTrees++;
                        continue;
                    }
                    if(lookRight(row, col, trees[row,col]))
                    {
                        numVisibleTrees++;
                        continue;
                    }
                    if(lookDown(row, col, trees[row,col]))
                    {
                        numVisibleTrees++;
                        continue;
                    }
                }
            }

            return numVisibleTrees;
        }

        public Boolean lookLeft(int row, int col, int target)
        {
            if (col == 0)
            {
                return true;
            }

            if(trees[row, col-1] >= target)
            {
                return false;
            }

            return lookLeft(row, col-1, target);
        }

        public Boolean lookRight(int row, int col, int target)
        {
            if (col == totalNumCols-1)
            {
                return true;
            }

            if(trees[row, col+1] >= target)
            {
                return false;
            }

            return lookRight(row, col+1, target);
        }

        public Boolean lookUp(int row, int col, int target)
        {
            if (row == 0)
            {
                return true;
            }

            if(trees[row-1, col] >= target)
            {
                return false;
            }

            return lookUp(row-1, col, target);
        }
        public Boolean lookDown(int row, int col, int target)
        {
            if (row == totalNumRows - 1)
            {
                return true;
            }

            if(trees[row+1, col] >= target)
            {
                return false;
            }

            return lookDown(row+1, col, target);
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