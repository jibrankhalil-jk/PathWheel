using System.Collections.Generic;
using UnityEngine;

public class Edge
{
    public Node startNode;
    public Node endNode;

    public Edge(Node from, Node to)
    {
        startNode = from;
        endNode = to;
    }
}
