namespace EmployeeRecord.Models
{
    public class EmployeeDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Department { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfJoin { get; set; }
        public bool IsPermanent { get; set; }
    }
}
