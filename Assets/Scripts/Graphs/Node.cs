using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Node {

    public List<Edge> edgeList = new List<Edge>();
    public Node path = null;
    public float f, g, h;
    public Node cameFrom;

    private GameObject id;

    public Node(GameObject i) {

        id = i;
        path = null;
    }

    public GameObject getID() {

        return id;
    }
}