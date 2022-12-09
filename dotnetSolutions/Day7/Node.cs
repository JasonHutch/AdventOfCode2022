using System;

namespace Advent_Of_Code_2022.Day7
{
    class Node
    {
        public Node(string nodeName)
        {
            name = nodeName;
            children = new List<Node>();
        }

        public Node(string nodeName, Node parentNode, List<Node> childrenNodes)
        {
            name = nodeName;
            parent = parentNode;
            children = childrenNodes;
        }

        public Node(string nodeName, int fileSize, Node parentNode)
        {
            name = nodeName;
            size = fileSize;
            parent = parentNode;
        }

        public string? name {get; set;}
        public int size {get; set;}
        public Node? parent {get; set;}
        public List<Node>? children {get; set;}
    }
}
