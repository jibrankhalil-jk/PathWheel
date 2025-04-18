using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Graph {

    List<Edge> edges = new List<Edge>();
    List<Node> nodes = new List<Node>();

    public List<Node> pathList = new List<Node>();

    public Graph() { }

    public void AddNode(GameObject id) {

        Node node = new Node(id);
        nodes.Add(node);
    }

    public void AddEdge(GameObject fromNode, GameObject toNode) {

        Node from = FindNode(fromNode);
        Node to = FindNode(toNode);

        if (from != null && to != null) {

            Edge e = new Edge(from, to);
            edges.Add(e);
            from.edgeList.Add(e);
        }
    }

    public GameObject getPathPoint(int index) {

        return pathList[index].getID();
    }

    private Node FindNode(GameObject id) {

        foreach (Node n in nodes) {

            if (n.getID() == id) return n;
        }
        return null;
    }

    public bool AStar(GameObject startID, GameObject endID) {


        Node start = FindNode(startID);
        Node end = FindNode(endID);

        if (start == null || end == null) return false;

        List<Node> open = new List<Node>();
        List<Node> closed = new List<Node>();

        float tentative_g_score = 0.0f;
        bool tentative_is_better;

        start.g = 0.0f;
        start.h = distance(start, end);
        start.f = start.h;

        open.Add(start);

        while (open.Count > 0) {

            int i = lowestF(open);
            Node thisNode = open[i];
            if (thisNode.getID() == endID) {

                ReconstructPath(start, end);
                return true;
            }

            open.RemoveAt(i);
            closed.Add(thisNode);
            Node neighbour;
            foreach (Edge e in thisNode.edgeList) {

                neighbour = e.endNode;

                if (closed.IndexOf(neighbour) > -1) continue;

                tentative_g_score = thisNode.g + distance(thisNode, neighbour);
                if (open.IndexOf(neighbour) == -1) {

                    open.Add(neighbour);
                    tentative_is_better = true;
                } else if (tentative_g_score < neighbour.g) {

                    tentative_is_better = true;
                } else
                    tentative_is_better = false;

                if (tentative_is_better) {

                    neighbour.cameFrom = thisNode;
                    neighbour.g = tentative_g_score;
                    neighbour.h = distance(thisNode, end);
                    neighbour.f = neighbour.g + neighbour.h;
                }
            }
        }
        return false;
    }

    private void ReconstructPath(Node startId, Node endId) {

        pathList.Clear();
        pathList.Add(endId);

        var p = endId.cameFrom;

        while (p != startId && p != null) {

            pathList.Insert(0, p);
            p = p.cameFrom;
        }

        pathList.Insert(0, startId);
    }

    float distance(Node a, Node b) {

        return Vector3.SqrMagnitude(a.getID().transform.position - b.getID().transform.position);
    }

    int lowestF(List<Node> l) {

        float lowestf = 0.0f;
        int count = 0;
        int iteratorCount = 0;

        lowestf = l[0].f;

        for (int i = 1; i < l.Count; ++i) {

            if (l[i].f < lowestf) {

                lowestf = l[i].f;
                iteratorCount = count;
            }
            count++;
        }
        return iteratorCount;
    }
}