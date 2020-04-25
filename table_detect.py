import camelot-py

#fname = input("Enter the PDF to be processed:");
fname = "/home/himanshu/Documents/Resume_2.pdf"

tables = camelot.read_pdf(fanme)

print("Number of tables extracted:", tables.n)