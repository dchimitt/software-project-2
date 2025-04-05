import sys
import json

#sort list of students by key
#keys: FirstName, MiddleName, LastName, StudentID, CourseScore
#expects command-line argument 

#reverse=FALSE defaults to ascending order


def sort_students(students, key, reverse=False):
    try:

        return sorted(students, key=lambda x: x.get(key, ""), reverse=reverse)
    except KeyError:
        print(f"Error: Invalid sort key '{key}'")
        sys.exit(1)

#takes json as input from stdin, sorts, and outputs json
def main():
    try:
        data = sys.stdin.read().strip()
        students = json.loads(data)

#command-line arguments 1st being catagory to be sorted
#2nd being order being sorted
        sort_key = sys.argv[1] if len(sys.argv) > 1 else "CourseScore"
        sort_order = sys.argv[2] if len(sys.argv) > 2 else "asc"
        reverse = (sort_order.lower() == "desc")

        sorted_students = sort_students(students, sort_key, reverse)
        print(json.dumps(sorted_students))

    except json.JSONDecodeError:
        print("Error: Invalid JSON input")
        sys.exit(1)

if __name__ == "__main__":
    main()
