import { useFindDepartment } from "@/feature/department";

function Department({ id }: { id: string }) {
    const { department, isLoading } = useFindDepartment(id);

    if (isLoading) {
        return <span className="text-muted-foreground text-xs">Loading...</span>;
    }

    return (
        <span>
            {department?.name || "No Department"}
        </span>
    );
}

export default Department;