using UnityEngine;

[System.Serializable]

public struct Link
{
    public enum direction {UNI, BI}
    public GameObject node1;
    public GameObject node2;

    public direction dir;
}

public class WPManager : MonoBehaviour
{
    public GameObject [] waypoints;

    public Link [] links;
}
