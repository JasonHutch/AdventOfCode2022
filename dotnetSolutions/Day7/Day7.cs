using System.Collections.Generic;

namespace Advent_Of_Code_2022.Day7
{
    class Day7
    {
        List<int> totals = new List<int>();
        int totalNum = 0;

        public void run()
        {
            string data = File.ReadAllText("./Day7/input.txt");
            List<int> dirSizes = new List<int>();
            Node root = buildDirectory(data);
            calcDir(root);

            foreach (var item in totals) 
            {
                if(item < 100000)
                {
                    totalNum += item; 
                }
            }

            Console.WriteLine(totalNum);
        }

        public Node buildDirectory(string data)
        {
            Node root = new Node("/");
            Node currentNode = root;
            string[] instructions = data.Split("\r\n");
            foreach(string instruction in instructions)
            {
                string[] parts = instruction.Split(" ");
                //cd
                if(parts.Count() == 3)
                {
                    string target = parts[2];

                    if (target == ".." && currentNode.parent != null)
                    {
                        currentNode = currentNode.parent;
                    }
                    else if (target == "/")
                    {
                        continue;
                    }
                    else if (currentNode.children != null)
                    {
                        currentNode = currentNode.children.First( child => child.name == target);
                    }

                }
                //dir and file
                else if (parts[0] != "$")
                {
                    string type = parts[0]; //dir or number
                    string target = parts[1];

                    if (type == "dir" && currentNode.children != null)
                    {
                        Node newDirectory = new Node(target,currentNode,new List<Node>());
                        currentNode.children.Add(newDirectory);
                    }
                    else if (type != "dir")
                    {
                        int value = Int32.Parse(type);
                        currentNode.size += value;
                    }
                }
            }

            while(currentNode.parent != null)
            {
                currentNode = currentNode.parent;
            }

            return currentNode;

        }

        public int calcDir(Node node)
        {
            int dirTotal = node.size;

            if(node.children.Count == 0)
            {
                totals.Add(dirTotal);
                return dirTotal;
            }

            foreach(Node dir in node.children) 
            {
                dirTotal += calcDir(dir);
            } 

           totals.Add(dirTotal);
           return dirTotal;
        }
    }
}